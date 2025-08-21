import 'package:flutter/material.dart';

class VerificationScreen extends StatelessWidget {
  const VerificationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Text(
            'Your wholesaler account is pending verification. You will be notified once approved.',
            textAlign: TextAlign.center,
          ),
        ),
      ),
    );
  }
}
