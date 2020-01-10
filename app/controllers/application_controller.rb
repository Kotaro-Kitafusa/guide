class ApplicationController < ActionController::Base
  before_action :set_locale

  #params[:locale]がfalseだった場合にdefaultのlocale[:ja]を使う（application.rbにある）
  def set_locale
    # binding.pry
    I18n.locale = params[:locale] || I18n.default_locale
    # I18n.with_locale(locale, &action)
  end

# around_action :switch_locale

# def switch_locale(&action)
#   locale = params[:locale] || I18n.default_locale
#   I18n.with_locale(locale, &action)
# end

  #この記述に対する理解は https://railsguides.jp/i18n.html の2.2.2 URL paramsを元にロケールを設定する を読む
  def default_url_options(options = {})
    { :locale => I18n.locale }.merge options
 end
end
