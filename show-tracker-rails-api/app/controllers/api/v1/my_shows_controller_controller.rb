class Api::V1::MyShowsControllerController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    my_show = MyShow.find_or_create_by(id: my_show_params[:id])
    if my_show
      response = {
        id: my_show.id
      }
      render json: response, status: 201
    else
      render json: {}, status: 401
    end
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
