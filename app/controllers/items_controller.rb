class ItemsController < ApplicationController
    before_action :authorize



    def index 
        render json: Item.all, status: :ok
    end

    def show
        item = Item.find_by!(id: params[:id])
        render json: item, status: :ok
    end



end