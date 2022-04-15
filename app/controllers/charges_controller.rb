class ChargesController < ApplicationController
    # before_action :authenticate_employee!
    # before_action :find_item
    before_action :authorize



    def create
        card = Stripe::Token.create({card: {number: params[:card][:number],exp_month: params[:card][:exp_month],exp_year: params[:card][:exp_year],cvc: params[:card][:cvc]}})
        done = Stripe::Charge.create(
            source: card,
            currency: "usd",
            amount: (params[:total_price] * 100).to_i
        )
        byebug
        render json: {worked: "worked"},status: :ok
        # rescue Stripe::CardError => e
        # flash[:error] = e.message
        #     end
    end
#     def create
#       stripe_card_id =
#         if params[:credit_card].present?
#           CreditCardService.new(session[:user_id].id, card_params).create_credit_card
#         else
#           charge_params[:card_id]
#         end
    
#         byebug
#       Stripe::Charge.create(
#         # customer: Employee.find(session[:user_id]),
#         customer: params[:customer],
#         source:   stripe_card_id,
#         amount:   params[:total_price],
#         currency: 'usd'
#       )
    
#       if params[:credit_card].present? && stripe_card_id
#         current_user.credit_cards.create_with(card_params).find_or_create_by(stripe_id: stripe_card_id)
#       end
#     rescue Stripe::CardError => e
#       flash[:error] = e.message
#     end
    
#     private
    
    def card_params
      params.require(:credit_card).permit(:number, :month, :year, :cvc)
    end
    
#     def charge_params
#       params.require(:charge).permit(:card_id)
#     end
    
#     def find_product
#       @product = Product.find(params[:product_id])
#     rescue ActiveRecord::RecordNotFound => e
#       flash[:error] = 'Product not found!'
#       redirect_to root_path
#     end
#   end
end