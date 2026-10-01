import os
import re

files_to_check = [
    'app/privacy/page.tsx',
    'app/terms/page.tsx',
    'app/industries/page.tsx',
    'app/finance-health-check/page.tsx',
    'app/for-accountants/page.tsx'
]

def process_file(filepath):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return

    with open(filepath, 'r') as f:
        content = f.read()

    # Find the PageHero closing tag
    hero_match = re.search(r'<PageHero.*?\/>', content, re.DOTALL)
    if not hero_match:
        # Maybe it's closed like > ... </PageHero>
        hero_match = re.search(r'<PageHero.*?</PageHero>', content, re.DOTALL)
        
    if hero_match:
        end_idx = hero_match.end()
        
        # Look for the next section or SectionTransition
        next_sec = re.search(r'<(section|SectionTransition)[^>]*className="([^"]*)"', content[end_idx:])
        
        if next_sec:
            # Check if it has massive padding
            cls_str = next_sec.group(2)
            if 'py-16' in cls_str or 'pt-16' in cls_str or 'py-20' in cls_str or 'py-24' in cls_str or 'pt-20' in cls_str or 'pt-24' in cls_str or 'pt-32' in cls_str:
                new_cls_str = cls_str.replace('py-16', 'pt-8 pb-16').replace('sm:py-20', 'sm:pt-10 sm:pb-20').replace('lg:py-24', 'lg:pt-12 lg:pb-24')
                new_cls_str = new_cls_str.replace('pt-16', 'pt-8').replace('sm:pt-20', 'sm:pt-10').replace('lg:pt-24', 'lg:pt-12')
                new_cls_str = new_cls_str.replace('pt-32', 'pt-12').replace('sm:pt-36', 'sm:pt-12').replace('lg:pt-40', 'lg:pt-16')
                
                # Replace just this first occurrence
                match_start = end_idx + next_sec.start(2)
                match_end = end_idx + next_sec.end(2)
                
                content = content[:match_start] + new_cls_str + content[match_end:]
                
                with open(filepath, 'w') as f:
                    f.write(content)
                print(f"Updated {filepath}")
            else:
                print(f"Skipped {filepath} - no matching padding found: {cls_str}")
        else:
            print(f"Skipped {filepath} - no following section found")

for file in files_to_check:
    process_file(file)
