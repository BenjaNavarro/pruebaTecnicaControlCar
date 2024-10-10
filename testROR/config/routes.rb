Rails.application.routes.draw do
  # Health check route
  get "up" => "rails/health#show", as: :rails_health_check

  # PWA routes
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # Route to ApplicationController's index action
  get "index" => "application#index", as: :app_index

  get "import" => "application#import", as: :app_import

  get "capture" => "application#capture", as: :app_capture

  get "destroy" => "application#destroy", as: :app_destroy

  get "captured" => "application#captured", as: :app_captured

  # # Defines the root path route ("/")
  root "application#import" # or root "posts#index" if you want a different root
end
