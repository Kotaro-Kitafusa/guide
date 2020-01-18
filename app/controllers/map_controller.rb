class MapController < ApplicationController

  def index
  end

  def change_pilot_nickname
    @pilot = Pilot.find(current_pilot.id)
    respond_to do |format|
      format.html
      format.json
    end
    @pilot.update_attributes(pilot_nickname_params)
  end

  private

  def pilot_nickname_params
    params.permit(:nickname)
  end

end
