class CreditCardsController < ApplicationController
  before_action :set_credit_card, only: [:show, :update, :destroy]

  # GET /credit_cards
  def index
    @credit_cards = CreditCard.all

    render json: @credit_cards
  end

  # GET /credit_cards/1
  def show
    render json: @credit_card
  end

  # POST /credit_cards
  def create
    @credit_card = CreditCard.new(credit_card_params)

    if @credit_card.save
      render json: @credit_card, status: :created, location: @credit_card
    else
      render json: @credit_card.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /credit_cards/1
  def update
    if @credit_card.update(credit_card_params)
      render json: @credit_card
    else
      render json: @credit_card.errors, status: :unprocessable_entity
    end
  end

  # DELETE /credit_cards/1
  def destroy
    @credit_card.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_credit_card
      @credit_card = CreditCard.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def credit_card_params
      params.require(:credit_card).permit(:digits, :month, :year)
    end
end
