class ItemsController < ApplicationController
    before_action :authorize

    # TODO: Add endpoint to allow users to modify item count
    
    
    def index 
        render json: Item.all, status: :ok
    end

    def show
        item = Item.find_by!(id: params[:id])
        render json: item, status: :ok
    end

    def cash_check_out
        params[:items].each {|item| Item.find(item[:id]).update(quantity: (item[:quantity] - 1))}
        render json: Item.all,status: :ok
    end



end