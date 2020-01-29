class MapController < ApplicationController
  before_action :move_to_index, only:[:index]

  def index
    @enva = ENV["GOOGLE_MAP_API_KEY"]
  end

  # def change_pilot_nickname
  #   @pilot = Pilot.find(current_pilot.id)
  #   respond_to do |format|
  #     format.html
  #     format.json
  #   end
  #   @pilot.update_attributes(pilot_nickname_params)
  # end

  def change_pilot_location
    @pilot_location = PilotLocation.where(pilot_id: current_pilot.id).first_or_initialize
    @pilot_location.latitude = params[:lat]
    @pilot_location.longitude = params[:lng]
    @pilot_location.save
    respond_to do |format|
      format.json
    end
  end

  private

  def pilot_nickname_params
    params.permit(:nickname)
  end

  def pilot_location_params
    params.permit(:lat, :lng)
  end

  def move_to_index
    redirect_to root_path unless pilot_signed_in?
  end

end
