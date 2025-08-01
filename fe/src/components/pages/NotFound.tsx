import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-gray-600 text-muted-foreground">
            404
          </h1>
          <h2 className="text-2xl font-bold tracking-tight">
            Page Not Found
          </h2>
          <p className="text-muted-foreground font-semibold text-gray-700 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild className="font-semibold hover:shadow-lg bg-gray-700 text-white">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>

          <Button variant="outline" onClick={() => window.history.back()} className="font-semibold cursor-pointer hover:shadow hover:bg-gray-50 border-gray-300">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>

        <div className="pt-8">
          <p className="text-sm text-muted-foreground">
            Need help?{" "}
            <Link to="/contact" className="underline hover:no-underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
