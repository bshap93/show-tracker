class MyShowSerializer < ActiveModel::Serializer
  attributes :id, :title, :year, :poster_url, :slug, :description, :extended_info, :number_of_shows_aired
end
