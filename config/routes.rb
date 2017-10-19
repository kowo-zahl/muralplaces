Rails.application.routes.draw do

  require 'api_constraints'
  namespace :api, defaults: {format: 'json'} do
    scope module: :v1, constraints: ApiConstraints.new(version: 1,default: true) do
      get 'galleries/all' => 'galleries#showGalleries'
      resources :galleries
      get 'browse/:id' => 'galleries#browse'
      get 'like/:id' => 'galleries#getLikesSize'
      get 'dislike/:id' => 'galleries#getDislikesSize'
      resources :galleries do
        member do
          put "upvote",to:"galleries#upvote"
          put "downvote",to:"galleries#downvote"
        end
      end
      get 'comments/getRootComments/:id' => 'comments#getRootComments'
      get 'comments/getChildComments/:id' => 'comments#getChildComments'
      post 'comments/setComments/:id' => 'comments#setComments'
      delete 'comments/deleteComments/:id' => 'comments#destroy'
      get 'arts' => 'arts#index'
      get 'arts/:id' => 'arts#show'
      get 'thumb/:id' => 'arts#getThumbUrl'
      get 'allocations' => 'allocations#index'
      get 'allocations/:id' => 'allocations#show'
      post 'getUserName' => 'arts#getUserName'
      post 'getUserEmail' => 'arts#getUserEmail'

    end
  end
Blogo::Routes.mount_to(self, at: '/blog')
  #mount Blogo::Engine => "/blog"
  root 'galleries#index'
      patch 'allocations/:id' => 'allocations#update'
  resources :galleries,:path =>"/sammlung"
  get 'browse/:id' => 'galleries#browse'
  get 'like/:id' => 'galleries#getLikesSize'
  get 'dislike/:id' => 'galleries#getDislikesSize'
  get 'galleries/all',to:"galleries#showGalleries"
  get 'maps',to: "galleries#maps"

  get 'tags/:tag', to: 'galleries#index', as: :tag

  get 'static_pages/datenschutz'
  get 'static_pages/impressum'
  get 'static_pages/nutzungsbedingungen'
  get 'static_pages/publishPicture/:id',to: 'static_pages#publishPicture'
  
  resources :galleries do
    member do
      put "upvote",to:"galleries#upvote"
      put "downvote",to:"galleries#downvote"
    end
  end

  resources "contact_mails", only: [:new, :create]
  resources "comment_mails", only: [:new, :create]
  resources :privacies
  resources :impressums

  resources :arts,:path =>"/bilder"
  

  resources :users
  devise_for :users, controllers: {
       sessions: 'users/sessions',
       registrations: 'users/registrations'
  },:path_prefix => 'my'

  as :user do
    get "/login" => "users/sessions#new"
    get "/logout" => "users/sessions#destroy"
  end

  resources :impressums do
    member do
      put "upi", to: "impressums#upi"
      put "downi", to: "impressums#downi"
    end
  end
  resources :privacies do
    member do
      put "upspr", to: "privacies#upspr"
      put "downspr", to: "privacies#downspr"
    end
  end
  delete 'comments' => 'comments#destroy'
  get 'comments/index' => 'comments#index'
  resources :comments do

    member do
      get "getComments", to: "comments#getComments"
      post "setComments", to: "comments#setComments"
    end
  end
# The priority is based upon order of creation: first created -> highest priority.
# See how all your routes lay out with "rake routes".

# You can have the root of your site routed with "root"
# root 'welcome#index'

# Example of regular route:
#   get 'products/:id' => 'catalog#view'

# Example of named route that can be invoked with purchase_url(id: product.id)
#   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

# Example resource route (maps HTTP verbs to controller actions automatically):
#   resources :products

# Example resource route with options:
#   resources :products do
#     member do
#       get 'short'
#       post 'toggle'
#     end
#
#     collection do
#       get 'sold'
#     end
#   end

# Example resource route with sub-resources:
#   resources :products do
#     resources :comments, :sales
#     resource :seller
#   end

# Example resource route with more complex sub-resources:
#   resources :products do
#     resources :comments
#     resources :sales do
#       get 'recent', on: :collection
#     end
#   end

# Example resource route with concerns:
#   concern :toggleable do
#     post 'toggle'
#   end
#   resources :posts, concerns: :toggleable
#   resources :photos, concerns: :toggleable

# Example resource route within a namespace:
#   namespace :admin do
#     # Directs /admin/products/* to Admin::ProductsController
#     # (app/controllers/admin/products_controller.rb)
#     resources :products
#   end
end
