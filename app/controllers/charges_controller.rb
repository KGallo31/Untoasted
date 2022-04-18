class ChargesController < ApplicationController
    before_action :authorize



    def create
        byebug
        card = Stripe::Token.create({card:{number: params[:card][:number],exp_month: params[:card][:exp_month], exp_year: params[:card][:exp_year],cvc: params[:card][:cvc]}}) 
        # = Stripe::Token.create
        # (
        #     {
        #         card: 
        #         {
        #             number: params[:card][:number],
        #             exp_month: params[:card][:exp_month],
        #             exp_year: params[:card][:exp_year],
        #             cvc: params[:card][:cvc]
        #         }
        # })
        done = Stripe::Charge.create(
            source: card,
            currency: "usd",
            amount: (params[:total_price] * 100).to_i
        )
        
        receipt = Receipt.create(total_price: params[:total_price],last4: done[:payment_method_details][:card][:last4], card_type: done[:payment_method_details][:card][:brand],date_processed: Time.new)
        Saleitem.where(sale_id: params[:sale_id]).pluck(:item_id).each {|itemid|
            currentItem = Item.find(itemid)
            currentItem.update(quantity: (currentItem.quantity - 1))
             Receiptitem.create(receipt_id: receipt.id,item_id: currentItem.id)}
        render json: receipt,status: :ok
    rescue Stripe::CardError => e
        render json: {error: e.error.message}, status: e.http_status
    end



end