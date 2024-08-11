class SessionsController < ApplicationController
    before_action :authorize 
    skip_before_action :authorize, only: [:create]


    def create
        user = Employee.find_by(username: params[:username])
        if user
            session[:user_id] = user.id
            render json: user,status: :ok
        else
            render json: {errors: ["Invalid password"]}, status: :unauthorized 
        end
    end

    def destroy
        session.delete :user_id
        head :no_content
    end
end
