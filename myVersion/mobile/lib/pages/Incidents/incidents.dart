import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:feather_icons_flutter/feather_icons_flutter.dart';
import 'package:http/http.dart' as http;

Future<IncidentsData> fetchIncidents(int page) async {
  final response = await http.get("http://localhost:3333/incidents?page=$page");

  if (response.statusCode == 200) {
    return IncidentsData.fromJson(json.decode(response.body));
  } else
    throw Exception('Failed to load incidents');
}

class IncidentsData {
  final String title;
  final String description;
  final String ongId;
  final double value;

  IncidentsData({this.title, this.description, this.ongId, this.value});

  factory IncidentsData.fromJson(Map<String, dynamic> json) {
    return IncidentsData(
        title: json["title"],
        description: json["description"],
        value: json["value"],
        ongId: json["ongId"]);
  }
}

class Incidents extends StatefulWidget {
  Incidents({Key key}) : super(key: key);

  @override
  _IncidentsState createState() => _IncidentsState();
}

class _IncidentsState extends State<Incidents> {
  Future<IncidentsData> futureIncidents;
  var page;

  @override
  void initState() {
    super.initState();
    futureIncidents = fetchIncidents(page);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Row(
            children: [
              Image(image: AssetImage("assets/logo.png")),
              Text("Total de ")
            ],
          )
        ],
      ),
    );
  }
}
