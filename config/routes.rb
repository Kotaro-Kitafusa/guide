Rails.application.routes.draw do
  devise_for :pilots, controllers: {
     sessions: "pilots/sessions",
     passwords: "pilots/passwords",
     registrations: "pilots/registrations"
    }
  root to: "information#index"
end