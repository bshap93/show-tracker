class AddColumnsToMyShows < ActiveRecord::Migration
  def change
    add_column :my_shows, :trakt_id, :string
    add_column :my_shows, :trailer_url, :string
  end
end
