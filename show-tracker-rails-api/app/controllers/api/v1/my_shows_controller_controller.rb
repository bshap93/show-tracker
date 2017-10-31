class Api::V1::MyShowsControllerController < ApplicationController
  def create
    @my_show = MyShow.find_or_create_by(id: my_show_params[:id])
    binding.pry
  end

  def update
  end

  def destroy
  end

  def index
    @my_shows = MyShow.all
    render json: @my_shows
  end

  def show
  end

  private

  def my_show_params
    params.require(:my_show).permit(:id)
  end
end
