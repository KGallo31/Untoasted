class ApplicationController < ActionController::API
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    include ActionController::Cookies

    def currentUser
        Employee.find_by(id: session[:user_id])
    end

    private 

    def not_found(error)
        render json: {error: "#{error.model} not found"}
    end

    def record_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: 422
    end
end
