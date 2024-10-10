Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Specify the origins that you want to allow.
    # Replace '*' with 'http://localhost:4200' to allow only requests from your Angular app
    origins "http://localhost:4200"

    resource "*",
      headers: :any,  # Allow any headers (like Content-Type)
      methods: [ :get, :post, :put, :patch, :delete, :options, :head ],  # Allowed methods
      expose: [ "Authorization" ],  # Expose any specific headers if needed
      max_age: 600
  end
end
