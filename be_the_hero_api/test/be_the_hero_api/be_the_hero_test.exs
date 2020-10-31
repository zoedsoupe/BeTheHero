defmodule BeTheHeroApi.BeTheHeroTest do
  use BeTheHeroApi.DataCase

  alias BeTheHeroApi.BeTheHero

  describe "ongs" do
    alias BeTheHeroApi.BeTheHero.Ong

    @valid_attrs %{city: "some city", email: "some email", name: "some name", uf: "some uf", wpp: "some wpp"}
    @update_attrs %{city: "some updated city", email: "some updated email", name: "some updated name", uf: "some updated uf", wpp: "some updated wpp"}
    @invalid_attrs %{city: nil, email: nil, name: nil, uf: nil, wpp: nil}

    def ong_fixture(attrs \\ %{}) do
      {:ok, ong} =
        attrs
        |> Enum.into(@valid_attrs)
        |> BeTheHero.create_ong()

      ong
    end

    test "list_ongs/0 returns all ongs" do
      ong = ong_fixture()
      assert BeTheHero.list_ongs() == [ong]
    end

    test "get_ong!/1 returns the ong with given id" do
      ong = ong_fixture()
      assert BeTheHero.get_ong!(ong.id) == ong
    end

    test "create_ong/1 with valid data creates a ong" do
      assert {:ok, %Ong{} = ong} = BeTheHero.create_ong(@valid_attrs)
      assert ong.city == "some city"
      assert ong.email == "some email"
      assert ong.name == "some name"
      assert ong.uf == "some uf"
      assert ong.wpp == "some wpp"
    end

    test "create_ong/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = BeTheHero.create_ong(@invalid_attrs)
    end

    test "update_ong/2 with valid data updates the ong" do
      ong = ong_fixture()
      assert {:ok, %Ong{} = ong} = BeTheHero.update_ong(ong, @update_attrs)
      assert ong.city == "some updated city"
      assert ong.email == "some updated email"
      assert ong.name == "some updated name"
      assert ong.uf == "some updated uf"
      assert ong.wpp == "some updated wpp"
    end

    test "update_ong/2 with invalid data returns error changeset" do
      ong = ong_fixture()
      assert {:error, %Ecto.Changeset{}} = BeTheHero.update_ong(ong, @invalid_attrs)
      assert ong == BeTheHero.get_ong!(ong.id)
    end

    test "delete_ong/1 deletes the ong" do
      ong = ong_fixture()
      assert {:ok, %Ong{}} = BeTheHero.delete_ong(ong)
      assert_raise Ecto.NoResultsError, fn -> BeTheHero.get_ong!(ong.id) end
    end

    test "change_ong/1 returns a ong changeset" do
      ong = ong_fixture()
      assert %Ecto.Changeset{} = BeTheHero.change_ong(ong)
    end
  end

  describe "incidents" do
    alias BeTheHeroApi.BeTheHero.Incident

    @valid_attrs %{descrption: "some descrption", title: "some title", value: 120.5}
    @update_attrs %{descrption: "some updated descrption", title: "some updated title", value: 456.7}
    @invalid_attrs %{descrption: nil, title: nil, value: nil}

    def incident_fixture(attrs \\ %{}) do
      {:ok, incident} =
        attrs
        |> Enum.into(@valid_attrs)
        |> BeTheHero.create_incident()

      incident
    end

    test "list_incidents/0 returns all incidents" do
      incident = incident_fixture()
      assert BeTheHero.list_incidents() == [incident]
    end

    test "get_incident!/1 returns the incident with given id" do
      incident = incident_fixture()
      assert BeTheHero.get_incident!(incident.id) == incident
    end

    test "create_incident/1 with valid data creates a incident" do
      assert {:ok, %Incident{} = incident} = BeTheHero.create_incident(@valid_attrs)
      assert incident.descrption == "some descrption"
      assert incident.title == "some title"
      assert incident.value == 120.5
    end

    test "create_incident/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = BeTheHero.create_incident(@invalid_attrs)
    end

    test "update_incident/2 with valid data updates the incident" do
      incident = incident_fixture()
      assert {:ok, %Incident{} = incident} = BeTheHero.update_incident(incident, @update_attrs)
      assert incident.descrption == "some updated descrption"
      assert incident.title == "some updated title"
      assert incident.value == 456.7
    end

    test "update_incident/2 with invalid data returns error changeset" do
      incident = incident_fixture()
      assert {:error, %Ecto.Changeset{}} = BeTheHero.update_incident(incident, @invalid_attrs)
      assert incident == BeTheHero.get_incident!(incident.id)
    end

    test "delete_incident/1 deletes the incident" do
      incident = incident_fixture()
      assert {:ok, %Incident{}} = BeTheHero.delete_incident(incident)
      assert_raise Ecto.NoResultsError, fn -> BeTheHero.get_incident!(incident.id) end
    end

    test "change_incident/1 returns a incident changeset" do
      incident = incident_fixture()
      assert %Ecto.Changeset{} = BeTheHero.change_incident(incident)
    end
  end
end
