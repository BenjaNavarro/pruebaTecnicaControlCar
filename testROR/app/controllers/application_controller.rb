require "json"
require "net/http"

class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  @@pokemons = []
  @@captured_pokemons = []

  def index
    self.import if @@pokemons.empty?

    render json: { data: @@pokemons }, status: :ok
  end

  def capture
    pokemon_name = params[:name]
    capture_pokemon(pokemon_name)
    render json: { message: "#{pokemon_name} captured!", data: @@pokemons }, status: :ok
  end

  def capture_pokemon(pokemon_name)
    return if @@captured_pokemons.size >= 6

    pokemon = @@pokemons.find { |p| p[:name] == pokemon_name }

    if pokemon && !pokemon[:captured]
      pokemon[:captured] = true
      @@captured_pokemons << pokemon_name
    end
  end

  def captured_pokemons
    @@pokemons.select { |pokemon| pokemon[:captured] }
  end

  def captured
    render json: { captured: captured_pokemons }, status: :ok
  end

  def destroy
    pokemon_name = params[:name]
    released_pokemon(pokemon_name)
    render json: { message: "#{pokemon_name} released!", data: @@pokemons }, status: :ok
  end

  def released_pokemon(pokemon_name)
    pokemon = @@pokemons.find { |p| p[:name] == pokemon_name }
    if pokemon && pokemon[:captured]
      pokemon[:captured] = false
      @@captured_pokemons.delete(pokemon_name)
    end
  end

  def import
    url = "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0"
    uri = URI(url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    request = Net::HTTP::Get.new(uri)
    response = http.request(request)

    if response.is_a?(Net::HTTPSuccess)
      body = JSON.parse(response.body)

      # Iterate over each Pokémon to fetch detailed data
      body["results"].each do |pokemon|
        pokemon_data = get_pokemon_data(pokemon["url"])
        @@pokemons << {
          name: pokemon_data["name"],
          url: pokemon_data["url"],
          types: pokemon_data["types"].map { |type_info| type_info["type"]["name"] }, # Extract types
          abilities: pokemon_data["abilities"].map { |ability_info| ability_info["ability"]["name"] }, # Extract abilities
          captured: false
        }
      end
    else
      @@pokemons = [] # Handle failure case
    end
  end

  def get_pokemon_data(pokemon_url)
    uri = URI(pokemon_url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    request = Net::HTTP::Get.new(uri)
    response = http.request(request)

    if response.is_a?(Net::HTTPSuccess)
      JSON.parse(response.body)
    else
      {} # Return an empty hash or handle errors as needed
    end
  end

  def search_pokemon
    search = params[:search]

    if search.nil?
      render json: { message: "vacío", data: [] }, status: :ok
      return
    end

    result = @@pokemons.select do |pokemon|
      (pokemon[:name].downcase.include?(search.downcase)) ||
      (pokemon[:types].any? { |type| type.downcase.include?(search.downcase) })
    end

    render json: { message: "search", test: { search: search }, data: result }, status: :ok
  end
end
