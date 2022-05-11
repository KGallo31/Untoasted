Rails.application.routes.draw do
  # resources :names
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post '/login', to: 'sessions#create'
  post '/signup', to: 'employees#create'
  delete '/logout', to: "sessions#destroy"
  get "/me", to: "employees#show"
  patch '/clockin/:id', to: "employees#clock_in"
  get '/currentCart/:id', to: "saleitems#find_cart"
  post '/add_cart', to: "sales#new_cart"
  patch '/cash-check-out', to: "items#cash_check_out"
  resources :items, only: [:index,:show]
  resources :sales, only: [:show,:create]
  resources :saleitems, only: [:show,:create,:index]
  resources :charges, only: [:new, :create]
  resources :receipts, only: [:show]

  mount StripeEvent::Engine, at: '/payments'

end 