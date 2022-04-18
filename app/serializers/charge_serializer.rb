class ChargeSerializer < ActiveModel::Serializer
  attributes :id

  def receipt
    "Total:#{self.object.total_price}"
  end

end
