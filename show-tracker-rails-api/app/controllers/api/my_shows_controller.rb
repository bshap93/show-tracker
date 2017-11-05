class Api::MyShowsController < ApplicationController
  def index
    @my_shows = MyShow.all
    render json: @my_shows
  end

  def create
    @my_show = MyShow.create(my_show_params)
    if @my_show.save
      render json: @my_show
    else
      render json: { errors: { message: "The Show Failed to Save" }}
    end
  end


  def destroy
    @my_show = MyShow.find(my_show_params[:id])
    if @my_show.destroy
      render json: { message: "Deleted" }
    else
      render json: { errors: { message: "The Show Failed to Destroy" }}
    end
  end
  #
  # def update
  # end
  #
  # def destroy
  # end
  #
  #
  #
  # def show
  # end

  private

  def my_show_params
    params.require(:my_show).permit(:id, :title, :description, :number_of_shows_aired, :slug, :trailer_url, :trakt_id, :year)
  end
end
