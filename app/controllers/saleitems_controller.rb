class SaleitemsController < ApplicationController
    def create 
        byebug
        # params[:key].each {|saleitem| Saleitem.create!(sale_id: saleitem.sale_id)}
        render json: Saleitem.create!(saleitems_params), status: :created
    end

    def show
        render json: Saleitem.find_by(id: params[:id]),status: :ok
    end

    def index
        render json: Saleitem.all, status: :ok
    end

    def find_cart
        a = Saleitem.where(sale_id: params[:id])
        arr = []
        a.each { |element| 
            arr << Item.find_by(id: element.item_id)
            # byebug
        }
        # byebug
        render json: {"items": arr}
    end

    private 

    def saleitems_params
        params.permit(:sale_id,:item_id)
    end
end
