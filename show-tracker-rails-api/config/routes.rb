Rails.application.routes.draw do
  namespace :api do
    resources :my_shows
  end
end
