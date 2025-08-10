#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys
from pathlib import Path

# Set the port
PORT = 3000

# Change to the script directory
os.chdir(Path(__file__).parent)

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def guess_type(self, path):
        """Guess the type of a file based on its URL."""
        mimetype, encoding = super().guess_type(path)
        
        # Add specific MIME types for better support
        if path.endswith('.woff'):
            return 'font/woff'
        elif path.endswith('.woff2'):
            return 'font/woff2'
        elif path.endswith('.ttf'):
            return 'font/ttf'
        elif path.endswith('.map'):
            return 'application/json'
        
        return mimetype

    def log_message(self, format, *args):
        print(f"Request: {args[0].split()[1]}")

def find_available_port(start_port):
    """Find an available port starting from start_port"""
    import socket
    for port in range(start_port, start_port + 100):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('localhost', port))
                return port
        except OSError:
            continue
    return None

if __name__ == "__main__":
    # Try to find an available port
    port = find_available_port(PORT)
    if port is None:
        print(f"Could not find an available port starting from {PORT}")
        sys.exit(1)
    
    print(f"Starting HTTP server on http://localhost:{port}/")
    print(f"Serving files from: {os.getcwd()}")
    print("Press Ctrl+C to stop the server")
    
    try:
        with socketserver.TCPServer(("", port), MyHTTPRequestHandler) as httpd:
            print(f"Server is running at http://localhost:{port}/")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    except Exception as e:
        print(f"Server error: {e}")
        print("Trying alternative approach...")
        
        # Fallback to basic HTTP server
        try:
            import webbrowser
            print(f"Opening browser to http://localhost:{port}")
            webbrowser.open(f'http://localhost:{port}')
            
            with socketserver.TCPServer(("", port), http.server.SimpleHTTPRequestHandler) as httpd:
                httpd.serve_forever()
        except Exception as e2:
            print(f"Fallback failed: {e2}")
            sys.exit(1)
