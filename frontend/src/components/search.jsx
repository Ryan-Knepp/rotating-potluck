import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

export default function SearchInput({ value, setValue, onSubmit }) {
  return (
    <div className="relative w-full max-w-sm my-2 px-2 md:px-0">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(value);
        }}
      >
        <Input
          type="text"
          placeholder="Search..."
          className="pr-10" // Add padding to the right to make space for the button
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setValue("")}
              className="h-full aspect-square rounded-none"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="h-full aspect-square rounded-r-md"
            aria-label="Perform search"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
