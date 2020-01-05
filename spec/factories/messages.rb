FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/test_image.jpg")}
    # 上記のコードが違う。実際の画像を用意する必要がある
    user
    group
  end
end