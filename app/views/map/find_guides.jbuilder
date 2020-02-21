json.array! @pilots do |pilot|
  if pilot.pilot_location.present? && pilot.pilot_location.latitude.present? && pilot.pilot_location.longitude.present?
    json.name pilot.first_name
    json.pilot_id pilot.id
    json.location_id pilot.pilot_location.id
    json.lat pilot.pilot_location.latitude.to_f
    json.lng pilot.pilot_location.longitude.to_f
  end
end