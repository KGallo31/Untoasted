class EmployeesController < ApplicationController
    before_action :authorize
    def create
        user = Employee.create!(employee_params)
        session[:user_id] = user.id
        byebug
        render json: user, status: :created
    end

    def show
        user = Employee.find_by(id: session[:user_id])
        if user
            render json: user, status: :ok
        else 
            render json: {error: "Invalid username or password"}, status: 401
        end
    end

    def clock_in
        employee = Employee.find_by(id: params[:id])
        employee.clocked_in = params[:clocked_in]
        employee.save
        session.delete :user_id unless employee.clocked_in
        render json: employee, status: :ok
    end

    private 
    def employee_params
        params.permit(:username, :password, :password_conformation,:clocked_in)
    end
end
