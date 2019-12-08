Rails.application.routes.draw do
  devise_for :users
  # gemにdeviseの記述をして、bundle installを実施している
  root 'groups#index'
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
    # 7つのアクションの定義を実施する。メッセージの一覧表示を行う&メッセージの入力ができるindexを記述する、create
    # messagesというコントローラーを記述。only:[]で配列内で該当のアクションと7つの中のアクションを指定している
  end
end