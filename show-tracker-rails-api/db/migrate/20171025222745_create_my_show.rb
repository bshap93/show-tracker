class CreateMyShow < ActiveRecord::Migration
  def change
    create_table :my_shows do |t|
      t.string :title
      t.string :year
      t.string :poster_url
      t.string :slug
      t.text :description
      t.text :extended_info
      t.integer :number_of_shows_aired
    end
  end
end
