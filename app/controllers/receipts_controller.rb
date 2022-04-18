class ReceiptsController < ApplicationController
    before_action :authorize

    def show
        items = []
        Receiptitem.where(receipt_id: params[:id]).pluck(:item_id).each {|item_id| items << Item.find(item_id)}
        render json: {receipt: Receipt.find(params[:id]),items: items}, status: :ok
    end

end
