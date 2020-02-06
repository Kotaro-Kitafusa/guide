json.array! @pilots do |pilot|
  if pilot.pilot_location.present? && pilot.pilot_location.latitude.present? && pilot.pilot_location.longitude.present?
    json.id pilot.pilot_location.id
    json.lat pilot.pilot_location.latitude.to_f
    json.lng pilot.pilot_location.longitude.to_f
  end
end
# json.array! @active_pilots do |pilot|
#   json.id pilot.id
#   json.lat pilot.latitude.to_f
#   json.lng pilot.longitude.to_f
# end
