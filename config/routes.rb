Rails.application.routes.draw do
  scope "(:locale)" do
    devise_for :pilot, controllers: {
      sessions: "pilots/sessions",
      passwords: "pilots/passwords",
      registrations: "pilots/registrations"
      }

    devise_scope :pilot do
      get 'change_pilot_type', to: 'pilots/registrations#change_pilot_type'
      get 'change_pilot_status', to: 'pilots/registrations#change_pilot_status'
    end
    root to: "information#index"
    resources :map, only: [:index] do
      collection do
        patch 'change_pilot_nickname'
        patch 'change_pilot_location'
      end
    end
  end
end