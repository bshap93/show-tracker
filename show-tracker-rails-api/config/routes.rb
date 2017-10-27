Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      post 'my_shows', :to => 'my_shows_controller#create'

      patch 'my_shows/:show', to: 'my_shows_controller#update'

      delete 'my_shows/:show', :to => 'my_shows_controller#destroy'

      get 'my_shows', :to => 'my_shows_controller#index'

      get 'my_shows/:show', :to => 'my_shows_controller#show'
    end
  end
end
