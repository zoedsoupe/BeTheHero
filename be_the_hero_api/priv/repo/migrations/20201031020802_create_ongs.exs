defmodule BeTheHeroApi.Repo.Migrations.CreateOngs do
  use Ecto.Migration

  def change do
    create table(:ongs, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :email, :string
      add :wpp, :string
      add :city, :string
      add :uf, :string

      timestamps()
    end

  end
end
