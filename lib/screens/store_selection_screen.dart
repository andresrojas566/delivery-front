import 'package:flutter/material.dart';

import 'product_catalog_screen.dart';

class StoreSelectionScreen extends StatelessWidget {
  const StoreSelectionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final stores = [
      {'id': '1', 'name': 'Store 1'},
      {'id': '2', 'name': 'Store 2'},
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('Select Store')),
      body: ListView.builder(
        itemCount: stores.length,
        itemBuilder: (context, index) {
          final store = stores[index];
          return ListTile(
            title: Text(store['name']!),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => ProductCatalogScreen(storeId: store['id']!),
                ),
              );
            },
          );
        },
      ),
    );
  }
}
