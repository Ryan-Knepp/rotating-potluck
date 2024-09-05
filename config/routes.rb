Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :potluck_iterations
      resources :potlucks
      resources :organizations
      resources :households
      resources :people do
        get "search", on: :collection
      end
    end
  end

  get "/login" => "auth#login"
  get "/logout" => "auth#logout"

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
