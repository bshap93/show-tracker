class MyShowsControllerController < ApplicationController
  def create
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
end
