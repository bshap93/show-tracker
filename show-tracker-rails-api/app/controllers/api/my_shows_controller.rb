class Api::MyShowsController < ApplicationController
  def index
    @my_shows = MyShow.all
    render json: @my_shows
  end

  def create
    debugger
    render json: {"stuff" => params}
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
    params.require(:my_show).permit(:id, :title)
  end
end
