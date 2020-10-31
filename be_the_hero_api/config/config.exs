# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :be_the_hero_api,
  ecto_repos: [BeTheHeroApi.Repo],
  generators: [binary_id: true]

# Configures the endpoint
config :be_the_hero_api, BeTheHeroApiWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "5ZsHM1LQDxqgEtdRpgefgjETb7Jga6GGvR3b4dWwbDK958UPiOEmCgIZMxMUw82c",
  render_errors: [view: BeTheHeroApiWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: BeTheHeroApi.PubSub,
  live_view: [signing_salt: "iNJLKkls"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
