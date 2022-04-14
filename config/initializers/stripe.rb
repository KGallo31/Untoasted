Rails.configuration.stripe = {
    publishable_key: Rails.application.secrets.stripe_publishable_key,
    secret_key:      Rails.application.secrets.stripe_secret_key
  }
  
  Stripe.api_key = Rails.configuration.stripe[:secret_key]

  StripeEvent.configure do |events|
    events.subscribe 'charge.succeeded' do |event|
      # Here you can send notification to user,
      # change transaction state or whatever you want.
    end
  end