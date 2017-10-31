Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :my_shows
    end
  end
end
