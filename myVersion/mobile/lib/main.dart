import 'package:flutter/material.dart';
import 'package:mobile/pages/Incidents/incidents.dart';

void main() {
  runApp(BeTheHero());
}

class BeTheHero extends StatelessWidget {
  const BeTheHero({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Incidents(),
    );
  }
}
