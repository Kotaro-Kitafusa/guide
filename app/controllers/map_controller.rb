class MapController < ApplicationController
  before_action :move_to_index, only:[:index]

  def index
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
    @pilot = Pilot.find(current_pilot.id)
    respond_to do |format|
      format.html
      format.json
    end
    @pilot.update_attributes(pilot_location_params)
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
