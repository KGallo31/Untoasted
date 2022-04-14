class SalesController < ApplicationController

    def create
        # byebug
        sale = Sale.create!(sale_params)
        render json: sale, status: :created
    end

    def show
        render json: Sale.find_by(id: params[:id])
    end

    def new_cart
        sale = Sale.create!(total_price: params[:total_price], employee_id: session[:user_id])
        params[:cart_items].each {|item| Saleitem.create(item_id: item[:id], sale_id: sale.id)}
        # byebug
        render json: sale, status: :created
    end

    private

    def sale_params
        params.permit(:total_price,:employee_id)
    end
end
