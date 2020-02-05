# frozen_string_literal: true

class Pilots::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]
  before_action -> { authenticate_pilot!(force: true) }, only: [:change_pilot_type]

  def change_pilot_type
    if current_pilot.pilot_type == "pilot"
      current_pilot.update(pilot_type: "traveller")
      redirect_to root_path
    else
      current_pilot.pilot_type == "traveller"
      current_pilot.update(pilot_type: "pilot")
      redirect_to root_path
    end
  end

  def change_pilot_status
    if current_pilot.status == "inactive"
       current_pilot.update(status: "active")
       redirect_to map_index_path
    else
       current_pilot.status == "active"
       current_pilot.update(status: "inactive")
       redirect_to map_index_path
    end
  end

  # GET /resource/sign_up
  def new
    super
  end

  # POST /resource
  def create
    super
  end

  # GET /resource/edit
  def edit
    super
  end

  # PUT /resource
  def update
    super
  end

  # DELETE /resource
  def destroy
    super
  end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  def cancel
    super
  end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute, :first_name, :last_name])
  end

  # If you have extra params to permit, append them to the sanitizer.
  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [:attribute, :nickname])
  end

  # The path used after sign up.
  def after_sign_up_path_for(resource)
    super(resource)
  end

  # The path used after sign up for inactive accounts.
  def after_inactive_sign_up_path_for(resource)
    super(resource)
  end

  def update_resource(resource, params)
    resource.update_without_password(params)
  end
end
