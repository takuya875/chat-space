Rails.application.routes.draw do
  devise_for :users
  # gemにdeviseの記述をして、bundle installを実施している
  root 'groups#index'
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index]
    # ネストしているので、グループのidが紐づいている
  end
end