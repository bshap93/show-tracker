class MyShowSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :number_of_shows_aired, :slug, :trailer_url, :trakt_id, :year
end
