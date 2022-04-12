Rails.application.routes.draw do
  # resources :names
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post '/login', to: 'sessions#create'
  post '/signup', to: 'employees#create'
  delete '/logout', to: "sessions#destroy"
  get "/me", to: "employees#show"
  patch '/clockin/:id', to: "employees#clock_in"
  resources :items, only: [:index,:show]
end 